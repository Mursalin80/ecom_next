// model Post {
//   id     String @id @default(auto()) @map("_id") @db.ObjectId
//   title  String
//   userId String @db.ObjectId
//   user   User   @relation(fields: [userId], references: [id])
// }

// model User {
//   id    String @id @default(auto()) @map("_id") @db.ObjectId
//   email String
//   posts Post[]
// }
