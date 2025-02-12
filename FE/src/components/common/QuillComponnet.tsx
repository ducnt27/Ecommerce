import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import "../../App.css";
type EditorProps = {
	content?: string; // Giá trị hiện tại của editor (HTML)
	onChange?: (content: string) => void; // Hàm xử lý khi nội dung thay đổi
};
const QuillComponent = ({ content, onChange }: EditorProps) => {
	const { quill, quillRef, Quill } = useQuill({
		modules: { blotFormatter: {} },
	});

	if (Quill && !quill) {
		// const BlotFormatter = require('quill-blot-formatter');
		Quill.register("modules/blotFormatter", BlotFormatter);
	}

	useEffect(() => {
		if (quill) {
			// Lắng nghe sự kiện text-change
			quill.on("text-change", () => {
				const content = quill.root.innerHTML; // Lấy nội dung HTML từ editor
				onChange?.(content); // Gọi hàm onChange để cập nhật giá trị
			});

			// Thiết lập giá trị ban đầu nếu có
			if (content) {
				quill.clipboard.dangerouslyPasteHTML(content);
			}
		}
	}, [quill, content]);

	// Lắng nghe thay đổi và gọi hàm `onChange`
	useEffect(() => {
		if (quill) {
			quill.on("text-change", () => {
				const content = quill.root.innerHTML;
				if (onChange) onChange(content);
			});
		}
	}, [quill, onChange]);
	return (
		<div>
			<div className="editor-container" ref={quillRef} />
		</div>
	);
};

export default QuillComponent;
