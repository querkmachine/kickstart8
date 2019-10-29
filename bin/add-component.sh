#!/bin/bash

# A script to make new components and their files

# Constants
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PARENT_DIR="$(dirname "$CURRENT_DIR")"
NAMESPACE="kickstart"

COMPONENT_NAME=$1
while [ -z "$COMPONENT_NAME" ]
do
  read -p 'Specify a component name: ' COMPONENT_NAME
done

COMPONENT_NAME_LOWER="$(echo $COMPONENT_NAME | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')"
COMPONENT_NAME_CAMEL="$(tr '[:lower:]' '[:upper:]' <<< ${COMPONENT_NAME:0:1})${COMPONENT_NAME:1}"
COMPONENT_NAME_CAMEL="$(echo $COMPONENT_NAME_CAMEL | sed 's/ //g')"

# Determine path
COMPONENT_PATH=$PARENT_DIR/components/$COMPONENT_NAME_LOWER

# Debugging
# echo $COMPONENT_NAME_LOWER
# echo $COMPONENT_NAME_CAMEL
# echo $COMPONENT_PATH

# Create files
mkdir $COMPONENT_PATH
touch "$COMPONENT_PATH/template.njk"
touch "$COMPONENT_PATH/macro.njk"
touch "$COMPONENT_PATH/$COMPONENT_NAME_LOWER.njk"
touch "$COMPONENT_PATH/$COMPONENT_NAME_LOWER.config.yaml"
touch "$COMPONENT_PATH/README.md"
touch "$COMPONENT_PATH/docs.yaml"

# Prepopulate macro
cat <<EOF > "$COMPONENT_PATH/macro.njk"
{% macro ${NAMESPACE}${COMPONENT_NAME_CAMEL}(params) %}
	{%- include "./template.njk" -%}
{% endmacro %}
EOF

# Prepopulate template
cat <<EOF > "$COMPONENT_PATH/template.njk"
<div
  data-module="${NAMESPACE}-${COMPONENT_NAME_LOWER}"
  class="${NAMESPACE}-${COMPONENT_NAME_LOWER} {%- if params.classes %} {{ params.classes }}{% endif %}"
  {%- for attribute, value in params.attributes %} {{ attribute }}="{{ value }}"{% endfor %}>
</div>
EOF

# Prepopulate template
cat <<EOF > "$COMPONENT_PATH/$COMPONENT_NAME_LOWER.njk"
{% from "${COMPONENT_NAME_LOWER}/macro.njk" import ${NAMESPACE}${COMPONENT_NAME_CAMEL} %}
EOF

# Prepopulate readme
cat <<EOF > "$COMPONENT_PATH/README.md"
## When to use this component

## When to consider something else

## Guidance

## Accessibility

## Browser considerations
EOF

cat <<EOF > "$COMPONENT_PATH/docs.yaml"
params:
  - name: attributes
    type: object
    required: false
    description: HTML attributes, such as data attributes, to add to the component.
  - name: classes
    type: string
    required: false
    description: Classes to add to the component.
EOF