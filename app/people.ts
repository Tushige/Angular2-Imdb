export class People{
  constructor (
    public title:string,
    public id:string,
    public url:string,
    public thumbnail: string)
    {
      this.title = title;
      this.id = id;
      this.url = url;
      this.thumbnail = thumbnail;
    }
}
