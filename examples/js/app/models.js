import eventQueue from 'common/event-queue'
import navigatorList from '../navigator-list'

export function getNavigatorList() {
  return navigatorList
}

export function runEventQueue(route) {
  eventQueue.executeQueue(route)
}

export function clearQueue() {
  eventQueue.clearQueue()
}
