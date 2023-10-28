export class Reportes{

  _id?: number;
  title: string;
  categoria: string;
  description: string;

  constructor(title: string, categoria: string, description: string){
      this.title=title;
      this.categoria= categoria;
      this.description= description;

  }
}
