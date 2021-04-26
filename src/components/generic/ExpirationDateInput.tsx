import FormattedInput from './FormattedInput';

type Props = {
  value: string;
  setValue(value: string): void;
};

export default function ExpirationDateInput({
  value,
  setValue,
}: Props): JSX.Element {
  function format(date: string): string {
    const len = date.length;
    let formatted = date.substring(0, 2);
    if (len >= 2) formatted += `/${date.substring(2, len)}`;
    return formatted;
  }

  function validKey(key: string): boolean {
    return key >= '0' && key <= '9';
  }

  return (
    <FormattedInput
      value={value}
      setValue={setValue}
      placeholder="MM/YYYY"
      maxLength={6}
      format={format}
      validKey={validKey}
    />
  );
}
