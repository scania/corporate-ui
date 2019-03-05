import { defineCustomElement } from '../esm/es5/corporate-ui.core'
import * as CUI from '../esm/es5/corporate-ui.components'

const CUI_COMPONENTS = CUI.COMPONENTS
const collections = require('./collection-manifest.json')

const subComponents = {}

const collection = collections.components
collection.forEach(obj => {
  if (obj.dependencies.length > 0) {
    subComponents[obj.tag] = obj.dependencies
  }
})

export function defineCustomElements(components) {
  if (components === 'all') {
    defineCustomElement(window, CUI_COMPONENTS);
  } else {
    components.forEach(project_comp => {
      defineCustomElement(window, [findComponent(project_comp)])
      for (const tag in subComponents) {
        if (project_comp === tag) {
          subComponents[tag].forEach(tagDep => {
            defineCustomElement(window, [findComponent(tagDep)])
          })
        }
      }
    })
  }
}

function findComponent(name) {
  let val
  CUI_COMPONENTS.forEach(comp => {
    if (comp[0] === name) val = comp
  })
  return val
}
