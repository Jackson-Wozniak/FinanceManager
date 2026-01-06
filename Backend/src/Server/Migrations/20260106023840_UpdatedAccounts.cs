using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedAccounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TermMonths",
                table: "credit_accounts");

            migrationBuilder.DropColumn(
                name: "Balance",
                table: "accounts");

            migrationBuilder.DropColumn(
                name: "InstitutionName",
                table: "accounts");

            migrationBuilder.RenameColumn(
                name: "PrincipalAmount",
                table: "credit_accounts",
                newName: "CreditLimit");

            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "credit_accounts",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Issuer",
                table: "credit_accounts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "bank_accounts",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "BankName",
                table: "bank_accounts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "loan_accounts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    Issuer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Balance = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PrincipalBalance = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TermMonths = table.Column<int>(type: "int", nullable: false),
                    InterestRate = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    IsCompoundInterest = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_loan_accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_loan_accounts_accounts_Id",
                        column: x => x.Id,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "loan_accounts");

            migrationBuilder.DropColumn(
                name: "Balance",
                table: "credit_accounts");

            migrationBuilder.DropColumn(
                name: "Issuer",
                table: "credit_accounts");

            migrationBuilder.DropColumn(
                name: "Balance",
                table: "bank_accounts");

            migrationBuilder.DropColumn(
                name: "BankName",
                table: "bank_accounts");

            migrationBuilder.RenameColumn(
                name: "CreditLimit",
                table: "credit_accounts",
                newName: "PrincipalAmount");

            migrationBuilder.AddColumn<int>(
                name: "TermMonths",
                table: "credit_accounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "accounts",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "InstitutionName",
                table: "accounts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
