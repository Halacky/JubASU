export interface User{
    login:string
    password:string
}

export interface Message {
    message: string
  }

export interface Reviews{
    name: string
    group: string
    city: string
    placeOfWork: string
    feedback: string
    date?: string 
    _id?: string,
    imageSrc?: string
    coor?:string,
    active?:boolean
}

export interface Gallery{
    filename:string
    _id : string
     md5: string
    contentType: string
}

export interface Memories{
    text: string,
    name: string,
    imgSrc?: string
}