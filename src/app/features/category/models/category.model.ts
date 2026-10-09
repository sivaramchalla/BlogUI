export interface AddCategoryRequest{
  name: string;
  urlHandle: string;
}

export interface EditCategoryRequest{
  name: string;
  urlHandle: string;
}

export interface Category{
    id: string;
    name: string;
    urlHandle: string;
}