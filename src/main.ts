

class User{
    public id:number;
    public name:string;
    public email:string;
    private password:string;
    protected phone: string;
    public age: number;
    private notebooks: NoteBook[] = [];
    constructor(
        id:number,name:string,email:string,password:string,
        phone:string,age:number
    
    ){
        if(age <18 || age >60){
            throw new Error("Age must be between 18 and 60")
        }
        this.id =id; this.name = name; this.email= email;this.password=password;
        this.phone=phone;
        this.age=age

    }
    displayInfo():void{
        console.log(`User #${this.id} | Name: ${this.name} | Email: ${this.email} | Phone: ${this.phone} | Age: ${this.age}`
)
    }







    addNotebook(notebook:NoteBook):void{
        this.notebooks.push(notebook)
    }
    getNotebooks(): NoteBook[] {
    return this.notebooks;
  }

}

class Admin extends User{
    manageNotes(notebook: NoteBook, noteId: number):void{
     console.log(`Admin ${this.name} is managing notes...`);
    notebook.removeNote(noteId)
    }
      override displayInfo(): void {
    super.displayInfo();
    console.log("Role: Admin");
      }

}
class Note{
    public id:number;
    public title:string;
    public content: string;
    public userId :number;
    public author :User;
constructor(id:number, title:string,content:string,author:User){
    this.id =id;
    this.title=title;
    this.content=content;
    this.author = author;
    this.userId = author.id
}
preview(length: number = 20): string {
    return this.content.length > length
      ? this.content.substring(0, length) + "..."
      : this.content;
  }
}
class NoteBook{
    public id:number;
    public title:string;
     private notes: Note[] = [];
     constructor(id:number , title:string){
        this.id = id;
        this.title=title
     }
     addNote(id:number, title:string,content:string, author: User):Note{
            const note = new Note(id, title, content, author);
            this.notes.push(note);
            return note
     }
      removeNote(id: number): void {
    const before = this.notes.length;
    this.notes = this.notes.filter((n) => n.id !== id);
    console.log(
      this.notes.length < before
        ? `Note ${id} removed from "${this.title}"`
        : `Note ${id} not found`
    );
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

class Storage<T extends { id: number }> {
  private items: T[] = [];
 
  addItem(item: T): void {
    this.items.push(item);
  }
 
  removeItem(id: number): void {
    this.items = this.items.filter((i) => i.id !== id); //   يبقا هو دا صح تمم متحقششي
  }
 
  getAllItems(): T[] {
    return this.items;
  }
 
  getItemById(id: number): T | undefined {
    return this.items.find((i) => i.id === id);
  }
}

// How to use in the console

const user = new User(1, "Ahmed", "ahmed@mail.com", "1234", "0100000", 25);
const admin = new Admin(2, "Sara", "sara@mail.com", "admin", "011", 35);
 
user.displayInfo();
admin.displayInfo();
 
const notebook = new NoteBook(1, "Work");
user.addNotebook(notebook); // Aggregation
 
const note = notebook.addNote(
  1,
  "Meeting",
  "Discuss the TypeScript OOP assignment with the team",
  user
);
notebook.addNote(2, "Todo", "Buy milk", user);
 
console.log(note.preview());
console.log(`Author of note: ${note.author.name}`); // Association
 
admin.manageNotes(notebook, 2);
 
// Generic storage works with any type that has an id
const userStorage = new Storage<User>();
userStorage.addItem(user);
userStorage.addItem(admin);
 
const noteStorage = new Storage<Note>();
noteStorage.addItem(note);
 
console.log(userStorage.getAllItems().length, noteStorage.getItemById(1)?.title);
 
export {};





/*Part B - نقطة 2: تحديد العلاقات (Identify Relationships)



Inheritance (وراثة): Admin ← User. السهم بمثلث فاضي بيشاور على الأب (User). معناها: Admin هو User.
Composition (تركيب): NoteBook ◆— Note. المعين المليان عند الـ NoteBook (المالك). معناها: الـ Notebook بيملك الـ Notes وبتتمسح معاه.
Aggregation (تجميع): User ◇— NoteBook. المعين الفاضي عند الـ User. معناها: اليوزر عنده notebooks (من 0 لـ كتير) بس الـ Notebook ممكن يعيش من غيره.
Association (ارتباط): Note ← User. سهم عادي مكتوب عليه author. معناها: كل Note تعرف كاتبها.


*/






