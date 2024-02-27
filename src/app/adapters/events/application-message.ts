export type ApplicationMessageTopic = 'APPLICATION-ERROR' | 'GAME-INFO'

export type ApplicationMessage = {
  level: 'INFO' | 'DEBUG' | 'WARNING' | 'ERROR'
  message: string
  topic: ApplicationMessageTopic
}
