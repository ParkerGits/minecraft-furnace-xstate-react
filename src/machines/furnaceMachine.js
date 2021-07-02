import {createMachine} from 'xstate'

const furnaceMachine = createMachine({
  id: 'furnace',
  initial: 'idle',
  context: {
    itemSmelting: {
      name: null,
      quantity: null,
    },
    product: {
      name: null,
      quantity: 0,
    },
    fuel: {
      name: null,
      quantity: 0,
      numOperations: 0,
    },
    progress: 0,
    fuelOperationsRemaining: 0,
  },
  on: {
    REMOVE_PRODUCT: {
      actions: (context, event) => {
        context.product.name = null
        context.product.quantity = 0
      },
    },
    ADD_FUEL: [
      {
        actions: (context, event) => {
          context.fuel.name = event.item.toUpperCase()
          switch (event.item.toUpperCase()) {
            case 'COAL':
              context.fuel.numOperations = 8
              break
            default:
              break
          }
          context.fuel.quantity = event.quantity
        },
      },
    ],
    ADD_ITEM: {
      actions: (context, event) => {
        context.itemSmelting.name = event.item.toUpperCase()
        context.itemSmelting.quantity += event.quantity
      },
    },
  },
  states: {
    idle: {
      entry: (context, event) => {
        context.fuelOperationsRemaining = 0
      },
      on: {
        SMELT: {
          target: 'smelting',
          cond: (context, event) =>
            context.fuel.quantity > 0 && context.itemSmelting.quantity > 0,
          actions: (context, event) => {
            context.fuel.quantity = context.fuel.quantity - 1
            context.fuelOperationsRemaining = context.fuel.numOperations
          },
        },
      },
    },
    smelting: {
      after: {
        833: {
          target: 'smeltTick',
          actions: (context, event) => {
            context.progress = context.progress + 1
          },
        },
      },
    },
    itemFinishedSmelting: {
      always: [
        {
          target: 'idle',
          cond: (context, event) =>
            context.itemSmelting.quantity - 1 === 0 ||
            (context.fuel.quantity === 0 &&
              context.fuelOperationsRemaining - 1 === 0),
        },
        {
          target: 'smelting',
        },
      ],
    },
    smeltTick: {
      always: [
        {
          target: 'itemFinishedSmelting',
          cond: (context, event) => context.progress === 12,
          actions: (context, event) => {
            context.progress = 0
            context.itemSmelting.quantity = context.itemSmelting.quantity - 1
            context.fuelOperationsRemaining =
              context.fuelOperationsRemaining - 1
            if (
              context.fuelOperationsRemaining === 0 &&
              context.fuel.quantity > 0
            ) {
              context.fuel.quantity = context.fuel.quantity - 1
              context.fuelOperationsRemaining = context.fuel.numOperations
            }
            switch (context.itemSmelting.name) {
              case 'SAND':
                context.product.name = 'GLASS'
                context.product.quantity = context.product.quantity + 1
                break
              case 'COBBLESTONE':
                context.product.name = 'STONE'
                context.product.quantity = context.product.quantity + 1
                break
              default:
                break
            }
          },
        },
        {target: 'smelting'},
      ],
    },
  },
})

export default furnaceMachine
