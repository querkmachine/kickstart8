const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const yamljs = require("yamljs");
const fractal = require("@frctl/fractal").create();
const mandelbrot = require("@frctl/mandelbrot");

function getDesignTokens() {
	const dirPath = path.resolve(__dirname, "../tokens");
	const files = fs.readdirSync(dirPath);
	let tokenData = {};
	files.forEach(file => {
		const fileName = file.split(".")[0];
		const fileProps = yamljs.load(path.resolve(dirPath, file)).props;
		tokenData[fileName] = fileProps ? fileProps : {};
	});
	console.log({ tokenData });
	return tokenData;
}

const nunjucks = require("@frctl/nunjucks")({
	paths: ["components", "docs"],
	globals: {
		tokens: getDesignTokens()
	},
	filters: {
		theoTokenCategory: function(object, filterCategory) {
			let filteredTokens = {};
			Object.keys(object).forEach(key => {
				const val = object[key];
				if (val.category === filterCategory) filteredTokens[key] = val;
			});
			return filteredTokens;
		},
		theoTokenSass: function(string) {
			return `$${string.replace(/_/g, "-")}`;
		},
		merge: function(...objs) {
			let result = {};
			objs.forEach(obj => {
				if (!obj || typeof obj !== "object") {
					return;
				}
				result = _.merge(result, obj);
			});
			return result;
		}
	}
});

fractal.set("project.title", `Kickstart your design system`);

fractal.components.engine(nunjucks);
fractal.components.set("ext", ".(html|njk)");
fractal.components.set("path", "./components");
fractal.components.set("default.preview", "@preview");
fractal.components.set("default.status", "prototype");
fractal.components.set("statuses", {
	prototype: {
		label: "Prototype",
		description: "Prototype code. Do not implement.",
		color: "#FF3333"
	},
	wip: {
		label: "Work in progress",
		description: "Unfinished and subject to change. Implement with caution.",
		color: "#FF9233"
	},
	readme: {
		label: "Needs documentation",
		description:
			"Code complete but missing documentation. Implement with caution.",
		color: "#176BC1"
	},
	ready: {
		label: "Ready",
		description: "Code and documentation complete. Ready to implement.",
		color: "#29CC29"
	}
});

fractal.docs.engine(nunjucks);
fractal.docs.set("path", "./docs");
fractal.docs.set("default.status", "draft");

fractal.web.set("static.path", "./dist");
fractal.web.set("builder.dest", "./export");
fractal.web.theme(
	mandelbrot({
		format: "yaml",
		nav: ["docs", "components", "assets"],
		panels: ["notes", "view", "params", "html", "resources", "info"],
		styles: ["default", "/css/styleguide.css"]
	})
);

gulp.task("fractal:clean", () => {
	const del = require("del");
	return del(["./export"]);
});

gulp.task("fractal:watch", () => {
	const logger = fractal.cli.console;
	const server = fractal.web.server({
		sync: true,
		port: 9000
	});
	server.on("error", err => {
		logger.error(err.message);
	});
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}.`);
	});
});

gulp.task("fractal", () => {
	const logger = fractal.cli.console;
	const builder = fractal.web.builder();
	builder.on("progress", (completed, total) => {
		logger.update(`Exported ${completed} of ${total} items.`, "info");
	});
	builder.on("error", err => {
		logger.error(err.message);
	});
	return builder.build().then(() => {
		logger.success("Fractal build completed.");
	});
});
