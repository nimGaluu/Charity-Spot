import { Injectable } from '@nestjs/common';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  async getUserIDFromEmail(email : string)
  {
    return await this.prisma.user.findFirst({
      where:
      {
        email:email
      },
      select:
      {
        UserID:true
      }
    })
  }

  async getOrg(userID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        UserID:userID
      },
      select:
      {
        OrgName:true,
        NGONum:true,
        Description:true,
        AddressID:true
      }
    })
  }

  async getAdress(addressID : string)
  {
    return await this.prisma.organisation.findFirst({
      where:
      {
        AddressID:addressID
      },
      select:
      {
        Address:true,
        Address2:true,
        City:true,
        Province:true
      }
    })
  }

  async getRating(OrgID : string)
  {
    return await this.prisma.Organisation.findMany({
      where:
      {
        OrgID:OrgID
      },
      select:
      {
        ClientID:true,
        rating:true,
        Comment:true
      }
    })
  }
}