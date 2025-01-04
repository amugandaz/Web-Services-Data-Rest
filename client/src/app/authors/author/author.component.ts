import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { Subscription } from "rxjs";
import { Author } from 'src/app/books/model/book';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../service/authors.service';
import { NgIf } from '@angular/common';
import { AuthornamesPipe } from 'src/app/pipes/authornames.pipe';



@Component({
  selector: 'app-author',
  standalone: true,
  imports : [NgIf, AuthornamesPipe],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']

})
export class AuthorComponent implements OnInit, OnDestroy {

  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
