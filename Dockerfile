FROM microsoft/aspnetcore-build:2.0 
ENV ASPNETCORE_URLS="http://+:7000"
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY . ./
WORKDIR /app/FLS.ClientSide/FLS.ClientSide
RUN dotnet restore

RUN dotnet publish -c Release -o out

# ENTRYPOINT ["dotnet", "out/FLS.ClientSide.dll"]