import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
export declare class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string;
    relationName(propertyName: string): string;
    tableName(targetName: string, userSpecifiedName?: string): string;
    joinColumnName(relationName: string, referencedColumnName: string): string;
    joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string;
    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string;
}
