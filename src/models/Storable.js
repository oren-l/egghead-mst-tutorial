import { types, flow, getSnapshot, onSnapshot } from 'mobx-state-tree'

export function createStorable (collection, idAttr) {
  return types
    .model({})
    .actions((self) => {
      return {
        save: flow(function * save () {
          try {
            const data = getSnapshot(self)
            yield window.fetch(`http://localhost:3001/${collection}/${self[idAttr]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
          } catch (error) {
            console.error('Uh oh, failed to save:', error)
          }
        }),
        afterCreate () {
          onSnapshot(self, self.save)
        }
      }
    })
}
