export type ApplicationMessageTopic = 'APPLICATION-ERROR'

export type ApplicationMessage = {
  level: 'INFO' | 'DEBUG' | 'WARNING' | 'ERROR'
  message: string
  topic: ApplicationMessageTopic
}
