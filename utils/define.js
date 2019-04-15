import { defineCustomElement } from './esm/es5/corporate-ui.core'
import * as CUI from './esm/es5/corporate-ui.components'
import collections from './collection/collection-manifest.json'

const CUI_COMPONENTS = CUI.COMPONENTS
let subComponents = {},
    components = [];

let collection = collections.components
collection.forEach(obj => {
  if (obj.dependencies.length > 0) {
    subComponents[obj.tag] = obj.dependencies
  }
})

function defineCustomElements(requests) {
  if(requests==='all') {
    components = [...CUI_COMPONENTS]
  } else {
    requests.forEach(project_comp => {
      components.push(findComponent(project_comp))
      for (let tag in subComponents) {
        if (project_comp === tag) {
          subComponents[tag].forEach(tagDep => {
            components.push(findComponent(tagDep))
          })
        }
      }
    })
  }
  defineCustomElement(window, components)
}

function findComponent(name) {
  var val
  CUI_COMPONENTS.forEach(comp => {
    if (comp[0] === name) val = comp
  })
  return val
}

export { defineCustomElements }
