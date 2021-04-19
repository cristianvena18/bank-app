import { Branch } from "../../../Domain/Entities/Branch";
import { BranchRepository } from "../../../Domain/Interfaces/Repositories/BranchRepository";
import MySqlBaseRepository from "./MysqlBaseRepository";
import { BranchModel } from "../Mappings/Branch";
import { injectable } from "inversify";

@injectable()
export default class MySqlBranchRepository
  extends MySqlBaseRepository<Branch>
  implements BranchRepository {
  public constructor() {
    super();
  }

  public async persist(branch: Branch): Promise<void> {
    this.initialize(BranchModel);
    await this.save(branch);
  }

  public async findOneById(id: string): Promise<Branch> {
    this.initialize(BranchModel);
    const data = await this.repository.findOne(id);

    if (data) {
      return Branch.fromPrimitives(data);
    }

    return undefined;
  }

  public async findAll(page: number, size: number): Promise<Branch[]> {
    this.initialize(BranchModel);
    return await this.repository.find({ take: size, skip: page });
  }

  public async delete(branch: Branch): Promise<void> {
    this.initialize(BranchModel);
    await this.repository.remove(branch);
  }
}
