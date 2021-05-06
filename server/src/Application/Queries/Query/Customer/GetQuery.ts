class GetQuery
{
    private id : string; 
    private authorization : string; 

    public constructor(
        id: string ,
        authorization: string 
    ) {
        this.id = id;
        this.authorization = authorization;
    }

    public getId(): string 
    {
        return this.id;
    }

    public getAuthorization(): string 
    {
        return this.authorization;
    }
}

export default GetQuery;