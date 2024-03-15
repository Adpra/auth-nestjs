import {  Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action, ActionGroup, Role } from "src/common/enums";
import { User } from "src/core/users";

type Subjects = InferSubjects<typeof User | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);  
    
    // console.log(user);
    // can(user.rolePermissions.some(permission => Object.values(ActionGroup.users).includes(permission)), 'all'); 

    if (user.rolePermissions) {
      for (const permission of user.rolePermissions) {
        const action = Object.keys(ActionGroup[permission['group']])?.find(key => ActionGroup[permission['group']][key] === permission['code']);
        
        if(action == 'Update') {
          can(ActionGroup[permission['group']][action], 'all', { id: user.sub });
        }else {
          can(ActionGroup[permission['group']][action], 'all');
        }
      }
    }
      
    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}