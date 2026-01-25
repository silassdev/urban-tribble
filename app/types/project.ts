export type ProjectImage = {
    src: string
    alt?: string
    blurDataURL?: string
}


export type Project = {
    id: string
    title: string
    description: string
    demoUrl: string
    imgA: ProjectImage
    imgB: ProjectImage
}