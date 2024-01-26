import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{
recipes: Recipe[] = [
  new Recipe('A test Recipe', 'This is a test', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/714a4d34-4368-4def-b575-7fd269cf0439/ddqzawx-d9945f25-123f-4410-aeb5-3b5d389585bf.jpg/v1/fill/w_182,h_250,q_70,strp/flan_recipe_by_elitandark_ddqzawx-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc1NCIsInBhdGgiOiJcL2ZcLzcxNGE0ZDM0LTQzNjgtNGRlZi1iNTc1LTdmZDI2OWNmMDQzOVwvZGRxemF3eC1kOTk0NWYyNS0xMjNmLTQ0MTAtYWViNS0zYjVkMzg5NTg1YmYuanBnIiwid2lkdGgiOiI8PTEyNzUifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DOAy3r0UFrZA8p3wTNAgPBTP-EoSoUsgK2Dva9-Tckg'),
  new Recipe('A test Recipe', 'This is a test', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/714a4d34-4368-4def-b575-7fd269cf0439/ddqzawx-d9945f25-123f-4410-aeb5-3b5d389585bf.jpg/v1/fill/w_182,h_250,q_70,strp/flan_recipe_by_elitandark_ddqzawx-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc1NCIsInBhdGgiOiJcL2ZcLzcxNGE0ZDM0LTQzNjgtNGRlZi1iNTc1LTdmZDI2OWNmMDQzOVwvZGRxemF3eC1kOTk0NWYyNS0xMjNmLTQ0MTAtYWViNS0zYjVkMzg5NTg1YmYuanBnIiwid2lkdGgiOiI8PTEyNzUifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DOAy3r0UFrZA8p3wTNAgPBTP-EoSoUsgK2Dva9-Tckg')
];
  constructor() {
  }
  ngOnInit() {
  }

  protected readonly Recipe = Recipe;
}
