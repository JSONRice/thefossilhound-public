import pick from "lodash-es/pick";
import pickBy from "lodash-es/pickBy";

// region Private Constants

const EVENT_HANDLER_REGEX = /^on[A-Z]/;

// endregion

export const GLOBAL_HTML_ATTRIBUTE_NAMES = [
  "accessKey",
  "autoCapitalize",
  "children",
  "className",
  "contentEditable",
  "contextMenu",
  "dir",
  "draggable",
  "dropzone",
  "hidden",
  "id",
  "is",
  "itemID",
  "itemProp",
  "itemRef",
  "itemScope",
  "itemType",
  "lang",
  "slot",
  "spellCheck",
  "style",
  "styleName",
  "tabIndex",
  "title",
  "translate"
];

export function pickGlobalHtmlAttributePropsService(
  obj,
  { omitEventHandlers } = {}
) {
  return {
    ...pick(obj, GLOBAL_HTML_ATTRIBUTE_NAMES),
    ...pickBy(
      obj,
      omitEventHandlers
        ? propertyIsDataAttribute
        : propertyIsDataAttributeOrEventHandler
    )
  };
}

export function propertyIsDataAttribute(_, propName) {
  return propName.startsWith("data-");
}

export function propertyIsEventHandler(_, propName) {
  return propName.match(EVENT_HANDLER_REGEX) != null;
}

export function propertyIsDataAttributeOrEventHandler(_, propName) {
  return (
    propertyIsEventHandler(_, propName) || propertyIsDataAttribute(_, propName)
  );
}
