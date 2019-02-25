import { defineCustomElement as defineCE } from '../esm/es5/corporate-ui.core'
import * as CUI from '../esm/es5/corporate-ui.components'
const CUI_COMPONENTS = CUI.COMPONENTS
var collections = require('./collection-manifest.json')
var subComponents = {}

let collection = collections.components
collection.forEach(obj => {
  if (obj.dependencies.length > 0) {
    subComponents[obj.tag] = obj.dependencies
  }
})

export function defineCustomElements(components) {
  components.forEach(project_comp => {
    defineCE(window, [findComponent(project_comp)])
    for (let tag in subComponents) {
      if (project_comp === tag) {
        subComponents[tag].forEach(tagDep => {
          defineCE(window, [findComponent(tagDep)])
        })
      }
    }
  })
}

function findComponent(name) {
  var val
  CUI_COMPONENTS.forEach(comp => {
    if (comp[0] === name) val = comp
  })
  return val
}
