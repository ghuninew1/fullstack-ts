import { Input, Button } from "#components";
import { cx } from "#utils/utils";

const FormInput = (props) => {
    const { onSubmit = () => {}, className = "", isProps } = props;

    const dataForm = [
        {
            name: "ip",
            type: "text",
            label: "IP",
            defaultValue: "1.1.1.1,1.0.0.1",
        },
        {
            name: "retry",
            type: "number",
            label: "Retry",
            defaultValue: "5",
        },
        {
            name: "interval",
            type: "number",
            label: "Interval",
            defaultValue: "1000",
        },
    ];

    return (
        <form className="my-3" onSubmit={onSubmit}>
            <div className="flex flex-col gap-1">
                {dataForm.map((item, idx) => (
                    <label
                        key={`label-${idx}`}
                        htmlFor={item.name}
                        className="inline-flex items-center justify-between gap-1 text-sm"
                    >
                        {item.label}
                        <Input
                            key={`input-${idx}`}
                            name={item.name}
                            type={item.type}
                            className={cx(
                                "h-main w-full rounded-md",
                                className
                            )}
                            defaultValue={item.defaultValue}
                            {...isProps}
                        />
                    </label>
                ))}
            </div>
            <Button
                type="submit"
                width="w-full"
                disabled={isProps?.disabled}
                color="bg-orange-600 my-3 text-white"
            >
                Submit
            </Button>
        </form>
    );
};


export default FormInput;
