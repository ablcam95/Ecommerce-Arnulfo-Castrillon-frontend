import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../common/category';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  productosFiltrados: Product[] = [];
  categorias: Category[] = [];
  products: Product[] = [];

  // Opciones de filtro
  tiposCalentador: string[] = ['Gas', 'Eléctrico'];
  capacidades: number[] = [6, 10, 15];
  rangosPrecio = [
  { label: '$0 - $500.000', min: 0, max: 500000 },
  { label: '$500.001 - $1.000.000', min: 500001, max: 1000000 },
  { label: '$1.000.001 - $2.000.000', min: 1000001, max: 2000000 },
];



  // Valores seleccionados
filtrosSeleccionados = {
  categorias: [] as string[],
  tipos: [] as string[],
  capacidades: [] as string[],
  rangos: [] as { label: string, min: number, max: number }[]
};

  constructor(
    private homeService:HomeService,

  ) {}

  ngOnInit(): void {
    // Cargar categorías
    this.homeService.getCategoryList().subscribe(
      dataCategory => this.categorias = dataCategory
    );

    // Cargar productos
    this.homeService.getProducts().subscribe(data => {
      this.products = data;
      this.filtrarProductos(); // Aplicar filtro inicial
    });
  }

  // Corrección en la declaración de filtrosSeleccionados:

onCheckboxChange(event: any, tipoFiltro: 'categorias' | 'tipos' | 'capacidades' | 'rangos') {
  const valor = event.target.value;
  const checked = event.target.checked;

  switch (tipoFiltro) {
    case 'categorias':
      this.toggleFiltro(valor, checked, this.filtrosSeleccionados.categorias);
      break;
    case 'tipos':
      this.toggleFiltro(valor, checked, this.filtrosSeleccionados.tipos);
      break;

    case 'capacidades':
      this.toggleFiltro(valor, checked, this.filtrosSeleccionados.capacidades);
      break;

    case 'rangos':
      if (checked) {
        const rango = this.rangosPrecio.find(r => r.label === valor);
        if (rango) this.filtrosSeleccionados.rangos.push(rango);
      } else {
        this.filtrosSeleccionados.rangos = this.filtrosSeleccionados.rangos.filter(r => r.label !== valor);
      }
      break;
  }

  this.filtrarProductos();
}

toggleFiltro<T>(valor: T, checked: boolean, lista: T[]) {
  if (checked) {
    if (!lista.includes(valor)) lista.push(valor);
  } else {
    const index = lista.indexOf(valor);
    if (index !== -1) lista.splice(index, 1);
  }
}


filtrarProductos() {
  this.productosFiltrados = this.products.filter(p => {
    const categoriaOk = this.filtrosSeleccionados.categorias.length === 0 ||
      this.filtrosSeleccionados.categorias.includes(p.categoryId.toString());

    const tipoOk = this.filtrosSeleccionados.tipos.length === 0 ||
      this.filtrosSeleccionados.tipos.includes(p.tipo);

    const capacidadOk = this.filtrosSeleccionados.capacidades.length === 0 ||
      this.filtrosSeleccionados.capacidades.includes(p.capacidad.toString())

    const precioOk = this.filtrosSeleccionados.rangos.length === 0 ||
      this.filtrosSeleccionados.rangos.some(r => p.price >= r.min && p.price <= r.max);

    return categoriaOk && tipoOk && capacidadOk && precioOk;
  });
}

isRangoSeleccionado(label: string): boolean {
  return this.filtrosSeleccionados.rangos.some(r => r.label === label);
}

}
