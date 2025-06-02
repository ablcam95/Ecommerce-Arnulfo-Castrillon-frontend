export class Product {
  constructor(
    public id:number,
    public name:string,
    public code:string,
    public capacidad:number,
    public tipo:string,
    public jacuzzi:boolean,
    public description:string,
    public urlImage:string,
    public image:File,
    public price:number,
    public activo:boolean,
    public userId:string,
    public categoryId:string
  ){}
}



// private Integer id;
//     private String name;
//     private String code;
//     private String description;
//     private String urlImage;
//     private BigDecimal price;
//     private Boolean activo;
//     private LocalDateTime dateCreated;
//     private LocalDateTime dateUpdated;
//     private Integer userId;
//     private Integer categoryId;
