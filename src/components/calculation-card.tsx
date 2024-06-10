import { cn } from "@/utils";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/App";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { applyTaxRate, TaxInfo, floorToZero } from "@/utils";

interface CalculationCardProps extends React.ComponentProps<typeof Card> {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

interface StatutoryHeir {
  id: number;
  title: string;
  ratio: number;
  statutoryDistribution: number;
  tax: TaxInfo;
}

function generateHeirs(
  numberOfHeirs: number,
  spouse: boolean,
  totalEstateAmount: number
): StatutoryHeir[] {
  let heirs: StatutoryHeir[] = [];
  let baseRatio = 1;

  if (spouse && numberOfHeirs == 1) {
    heirs.push({
      id: -1,
      title: "Spouse",
      ratio: 1,
      statutoryDistribution: Math.floor(totalEstateAmount * 1),
      tax: applyTaxRate(totalEstateAmount * 1),
    });
    return heirs;
  } else if (spouse && numberOfHeirs > 1) {
    numberOfHeirs -= 1;
    heirs.push({
      id: -1,
      title: "Spouse",
      ratio: 0.5,
      statutoryDistribution: Math.floor(totalEstateAmount * 0.5),
      tax: applyTaxRate(totalEstateAmount * 0.5),
    });
    baseRatio = 0.5;
  }

  for (let i = 0; i < numberOfHeirs; i++) {
    let ratio = baseRatio / numberOfHeirs;
    let heir = {
      id: i,
      title: `Heir #${i + 1}`,
      ratio: ratio,
      statutoryDistribution: Math.floor(totalEstateAmount * ratio),
      tax: applyTaxRate(totalEstateAmount * ratio),
    };
    heirs.push(heir);
  }

  return heirs;
}

export function CalculationCard({
  className,
  form,
  ...props
}: CalculationCardProps) {
  let totalApplicableAssets = form.watch("totalApplicableAssets") * 1;
  let deduction = form.watch("numberOfStatutoryHeirs") * 6_000_000 + 30_000_000;
  let estateAfterDeduction = floorToZero(totalApplicableAssets - deduction);

  let heirs = generateHeirs(
    form.watch("numberOfStatutoryHeirs"),
    form.watch("spouse"),
    estateAfterDeduction
  );

  let totalTaxOwed = 0;
  if (heirs.length == 0) {
    totalTaxOwed =
      applyTaxRate(estateAfterDeduction).owed *
      (form.watch("isStatutoryHeir") ? 1 : 1.2);
  } else {
    totalTaxOwed =
      heirs.reduce((total, heir) => total + heir.tax.owed, 0) *
      (form.watch("isStatutoryHeir") ? 1 : 1.2);
  }

  let effectiveTaxRate = totalTaxOwed / totalApplicableAssets || 0;

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Calculations</CardTitle>
        <CardDescription>Details of the tax calculations.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <span className="font-bold">Total Applicable Assets:</span>{" "}
          {totalApplicableAssets.toLocaleString()}¥
        </div>
        <div>
          <span className="font-bold">Deduction amount:</span>{" "}
          {deduction.toLocaleString()}¥
        </div>
        <div>
          <span className="font-bold">Applicable assets after deduction:</span>{" "}
          {estateAfterDeduction.toLocaleString()}¥
        </div>
        <ul className="space-y-4">
          {heirs.map((heir) => (
            <li key={heir.id}>
              <div>
                <span className="font-bold">{heir.title}</span> -{" "}
                {(heir.ratio * 100).toPrecision(3)}% share
              </div>
              <div className="text-muted-foreground">
                {heir.statutoryDistribution.toLocaleString()} ×{" "}
                {(heir.tax.rate * 100).toFixed(0)}% -{" "}
                {heir.tax.deduction.toLocaleString()} ={" "}
                {heir.tax.owed.toLocaleString()}¥
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid">
        <p>
          <span className="font-bold">Total Tax Owed:</span>{" "}
          {totalTaxOwed.toLocaleString()}¥
        </p>
        <p className="text-muted-foreground">
          Effective Tax Rate: {(effectiveTaxRate * 100).toPrecision(3)}%
        </p>
      </CardFooter>
    </Card>
  );
}
