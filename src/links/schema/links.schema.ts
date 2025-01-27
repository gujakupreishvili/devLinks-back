import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Links {
  @Prop()
  platform:string
  @Prop()
  url: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
  )
  user: mongoose.Schema.Types.ObjectId
}
export const LinksSchema = SchemaFactory.createForClass(Links);