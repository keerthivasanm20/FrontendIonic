/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-singlepostview',
  templateUrl: './singlepostview.page.html',
  styleUrls: ['./singlepostview.page.scss'],
})
export class SinglepostviewPage implements OnInit {

  @Input() postselected: any;
  select: string[]=[];
  comment: any;
  usercomment: string;
  constructor(private comments: CommentServiceService,private modalCtrl: ModalController) { }

  async back(){
    const post = await this.modalCtrl.create({
      component: TabsPage,
    });
    await post.present();
  }

  ngOnInit() {

    console.log(this.postselected);
    this.comments.getComments(this.postselected._id).subscribe((res: any)=>{this.comment=res.data;console.log(res);});
  }
  getLikeCount(){
    return this.comment.likeCount;
  }
  getCommentCount(){
    if(this.comment!==undefined){
      return this.comment.commentCount;
    }
  }

  likeselect(){
    console.log('Like selected..');
    return this.postselected.likes.length;
  }
  commentCount(){
    return this.postselected.comments.length;
  }
  addComment(){
    const userid: any={
      name: 'Ram',
      userid: '8648279',
      emailid: 'random@gmail.com',
      profilepic: '',
      description: 'Enjoy the way you are!',
      followers: [],
      following: [],
    };
     const cmt: any={
      // eslint-disable-next-line no-underscore-dangle
      post: this.postselected._id,
      user: '62aeeed26b0657ec29e03f84',
      comment: this.usercomment,
     };
     const dummyuser: any={
      id:'62aeeed26b0657ec29e03f84',
      name:'dhivya',
      profilepic:'https://zenprospect-production.s3.amazonaws.com/uploads/pictures/620a0fbdc6272000011346ec/picture'
     };
     const dummycmt: any={
      // eslint-disable-next-line no-underscore-dangle
      post: this.postselected._id,
      user: dummyuser,
      comment: this.usercomment
     };
     this.comment.commentCount++;
    this.comment.data.push(dummycmt);
    console.log(this.comment);
     this.comments.uploadComment(cmt).subscribe(res=>{console.log(res);});
    // this.comment = this.comments.commentCount(this.postselected.postUrl);
     this.usercomment='';
  }
  // likeselectForComment(comment: Comments){

  // }
  isImage(url: string) {
    if(url!==undefined){
      url=url.toLowerCase();
      // eslint-disable-next-line max-len
      if(url.includes('.jpg')||url.includes('.jpeg')||url.includes('.png')||url.includes('.webp')||url.includes('.avif')||url.includes('.gif')||url.includes('.svg')){
          return true;
      }else{
        return false;
      }
    }
    return false;
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }

}
