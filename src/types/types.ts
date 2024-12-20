export type Note = {
    id? : string
    noteTitle : string
    noteDescription : string
    noteStatus : 'completed' | 'pending'
}