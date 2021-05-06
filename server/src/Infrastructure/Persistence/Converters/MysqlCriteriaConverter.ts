import { Criteria } from "../../../Domain/ValueObjects/Criteria/Criteria";
import { Filters } from "../../../Domain/ValueObjects/Criteria/Filters";
import { Filter } from "../../../Domain/ValueObjects/Criteria/Filter";
import { Operator } from "../../../Domain/ValueObjects/Criteria/FilterOperator";
import { LessThanOrEqual, Like, MoreThan, Not } from "typeorm";

type QueryObject = { [field: string]: any };

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class MySqlCriteriaConverter {
  private queryTransformers: Map<
    Operator,
    TransformerFunction<Filter, QueryObject>
  >;

  constructor() {
    this.queryTransformers = new Map<
      Operator,
      TransformerFunction<Filter, QueryObject>
    >([
      [Operator.EQUAL, this.termsQuery],
      [Operator.NOT_EQUAL, this.termsQuery],
      [Operator.GT, this.greaterThanQuery],
      [Operator.LT, this.lowerThanQuery],
      [Operator.CONTAINS, this.wildcardQuery],
      [Operator.NOT_CONTAINS, this.wildcardQuery],
    ]);
  }

  public convert(criteria: Criteria): any {
    let body = {
      take: criteria.limit || 0,
      skip: criteria.offset || 20,
      order: {},
    };
    if (criteria.order.hasOrder()) {
      body = {
        ...body,
        order: {
          [criteria.order.orderBy.value]: criteria.order.orderType.value,
        },
      };
    }

    if (criteria.hasFilters()) {
      body = { ...body, ...this.generateQuery(criteria.filters) };
    }

    return body;
  }

  private generateQuery(filters: Filters) {
    let body = {};
    filters.filters.map((filter) => {
      body = { where: { ...body, ...this.queryForFilter(filter) } };
    });

    return body;
  }

  private queryForFilter(filter: Filter): QueryObject {
    const functionToApply = this.queryTransformers.get(filter.operator.value);

    if (!functionToApply) {
      throw Error(`Unexpected operator value ${filter.operator.value}`);
    }

    return functionToApply(filter);
  }

  private termsQuery(filter: Filter): QueryObject {
    if (filter.operator.isPositive()) {
      return { [filter.field.value]: filter.value.value };
    }

    return { [filter.field.value]: Not(filter.value.value) };
  }

  private greaterThanQuery(filter: Filter): QueryObject {
    if (filter.operator.isPositive()) {
      return { [filter.field.value]: MoreThan(filter.value.value) };
    }

    return { [filter.field.value]: Not(MoreThan(filter.value.value)) };
  }

  private lowerThanQuery(filter: Filter): QueryObject {
    if (filter.operator.isPositive()) {
      return { [filter.field.value]: LessThanOrEqual(filter.value.value) };
    }

    return { [filter.field.value]: Not(LessThanOrEqual(filter.value.value)) };
  }

  private wildcardQuery(filter: Filter): QueryObject {
    if (filter.operator.isPositive()) {
      return { [filter.field.value]: Like(filter.value.value) };
    }

    return { [filter.field.value]: Not(Like(filter.value.value)) };
  }
}
