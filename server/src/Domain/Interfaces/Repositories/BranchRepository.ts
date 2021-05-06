import { Branch } from "../../Entities/Branch";

export interface BranchRepository {
  persist(branch: Branch): Promise<void>;
  findOneById(id: string): Promise<Branch>;
  findAll(page: number, size: number): Promise<Branch[]>;
  delete(branch: Branch): Promise<void>;
}
