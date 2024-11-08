import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  searchText: string = '';
  tempData: any = [];
  selectedData: any = [];
  competetiorsOptionListVal: any = [
    { id: 1, value: 'Josh' },
    { id: 2, value: 'Alice' },
    { id: 3, value: 'Bob' },
    { id: 4, value: 'Grace' },
    { id: 5, value: 'David' },
    { id: 6, value: 'Eve' },
    { id: 7, value: 'Isaac' },
    { id: 8, value: 'Charlie' },
    { id: 9, value: 'Frank' },
    { id: 10, value: 'Hannah' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.tempData = [...this.competetiorsOptionListVal];
  }

  getChangedValue(event: any) {
    if (!this.searchText.length) {
      this.competetiorsOptionListVal = [...this.tempData];
    } else {
      this.competetiorsOptionListVal = this.tempData.filter((i: any) =>
        i.value.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  getSelectedData(data: any) {
    const alreadySelected = this.selectedData.some(
      (item: any) => item.id === data.id
    );

    if (!alreadySelected) {
      this.selectedData.push(data);
      this.competetiorsOptionListVal = this.competetiorsOptionListVal.filter(
        (item: any) => item.id !== data.id
      );

      this.tempData = this.tempData.filter((item: any) => item.id !== data.id);
    }
  }

  removeSelectedItem(index: number) {
    const removedItem = this.selectedData.splice(index, 1)[0];
    this.competetiorsOptionListVal.push(removedItem);
    this.competetiorsOptionListVal.sort((a: any, b: any) =>
      a.value.localeCompare(b.value)
    );
  }
}
