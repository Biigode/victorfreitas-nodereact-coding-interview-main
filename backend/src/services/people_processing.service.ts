import people_data from "../data/people_data.json";

export class PeopleProcessing {
  getById(id: number) {
    return people_data.find((p) => p.id === id);
  }

  getAll(page: number = 0, size: number = 10, query?: string) {
    const people_data_length = people_data.length;
    const total_pages = Math.round(people_data_length / size);
    const paginated_people = people_data.slice(page * size, page * size + size);
    const filtered_people = paginated_people.find(
      (value) => value.title === query
    );
    return query ? filtered_people : paginated_people;
  }
}
