import { getRepository, Repository } from "typeorm";
import { AggregateRoot } from "../../../Domain/ValueObjects/AggregateRoot";
import { Criteria } from "../../../Domain/ValueObjects/Criteria/Criteria";
import { MySqlCriteriaConverter } from "../Converters/MysqlCriteriaConverter";
import { injectable } from "inversify";

@injectable()
export default abstract class MySqlBaseRepository<T extends AggregateRoot> {
  protected repository: Repository<T>;
  private converter: MySqlCriteriaConverter;

  public initialize(model: any) {
    this.repository = getRepository(model);
  }

  public async findByCriteria(
    criteria: Criteria,
    unserializer: (data: any) => T
  ): Promise<T[]> {
    const data = await this.repository.find(this.converter.convert(criteria));

    return data.map((value) => unserializer(value));
  }

  protected async save(entity: T) {
    await this.repository.save(entity.toPrimitives());
  }
}
