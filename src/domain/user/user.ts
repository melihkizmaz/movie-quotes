import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

type ValidatePassword = (password: string) => Promise<boolean>;

@ObjectType()
@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  @Field(() => String)
  firstName: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  @Field(() => String)
  phone: string;

  @Prop({ type: String, required: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  password: string;

  validatePassword: ValidatePassword;
}

export type UserDocument = Document & User;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
