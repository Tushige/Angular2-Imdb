export class Actor{
  constructor (
    public title:string,
    public description:string,
    public image:string,
    public mediaLinks: Array<string>,
    public filmography: Array<string>,
    public occupation: Array<string>
  )
    {
      this.title = title;
      this.description = description ? description : null;
      this.image = image;
      this.mediaLinks = mediaLinks;
      this.filmography = filmography;
      this.occupation = occupation;
    }
}
