import { NextFunction, Request, Response } from "express";
import { error } from "../../../Infrastructure/Debug/customResponse";
import { CacheService } from "../../../Domain/Interfaces/Services/CacheService";
import { Bank } from "../../../Domain/Entities/Bank";
import { BankRepository } from "../../../Domain/Interfaces/Repositories/BankRepository";

export class VerificateDomainMiddleware {
  private cacheService: CacheService;
  private bankRepository: BankRepository;

  public constructor(
    cacheService: CacheService,
    bankRepository: BankRepository
  ) {
    this.cacheService = cacheService;
    this.bankRepository = bankRepository;
  }

  public async handle(req: Request, res: Response, next: NextFunction) {
    const domain = req.params.domain;
    if (!domain) {
      res
        .status(404)
        .json(error("", "Your must be provide a domain", "404", ""));
    }

    let availableSites;

    availableSites = await this.cacheService.getString("available_domains");
    if (!availableSites) {
      availableSites = await this.bankRepository.findAll();
      availableSites = availableSites.map((bank: Bank) => bank.getSlug().value);

      await this.cacheService.setString(
        "available_domains",
        JSON.stringify(availableSites)
      );
    } else {
      availableSites = JSON.parse(availableSites);
    }

    if (availableSites.includes(domain)) {
      next();
    } else {
      res.status(400).json(error("", "Domain invalid", "400", ""));
    }
  }
}
