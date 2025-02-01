import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import mongoose from "mongoose";

@Schema()
export class AwsS3 extends Document {
  @Prop()
  filePath: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  })
  userId: mongoose.Schema.Types.ObjectId;
}

export const AwsS3Schema = SchemaFactory.createForClass(AwsS3);
