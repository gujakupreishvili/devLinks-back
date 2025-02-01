import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User{
  @Prop()
  name:string
  @Prop({unique: true})
  email:string
  @Prop({select:false})
  password:string
  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Links"
  }])
  links:mongoose.Schema.Types.ObjectId[]
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref:"AwsS3"
  })
  urlId: mongoose.Schema.Types.ObjectId
}
export const UserSchema = SchemaFactory.createForClass(User)