import FormattedInput from './FormattedInput';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function CreditCardInput({
  value,
  setValue,
}: Props): JSX.Element {
  function format(num: string): string {
    const len = num.length;
    let formatted = num.substring(0, 4);
    if (len > 4) formatted += ' ' + num.substring(4, 8);
    if (len > 8) formatted += ' ' + num.substring(8, 12);
    if (len > 12) formatted += ' ' + num.substring(12, 16);

    return formatted;
  }

  function validKey(key: string): boolean {
    return key >= '0' && key <= '9';
  }

  return (
    <FormattedInput
      value={value}
      setValue={setValue}
      placeholder="Card number"
      maxLength={16}
      format={format}
      validKey={validKey}
    />
  );
}
