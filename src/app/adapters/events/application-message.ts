export type ApplicationMessageTopic = 'APPLICATION-ERROR' | 'GAME-INFO' | 'GAME-OVERLAY'

export type ApplicationMessage = {
  level: 'INFO' | 'DEBUG' | 'WARNING' | 'ERROR'
  message: string
  topic: ApplicationMessageTopic
  subMessage?: string
}
