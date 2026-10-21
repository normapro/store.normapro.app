// Utilidades compartidas entre el detalle de noticia (cliente) y sus metadatos (servidor).

export const formatContentParagraphs = (content: unknown): string[] => {
	if (!content) {
		return [];
	}

	if (typeof content === 'string') {
		return content
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0);
	}

	if (Array.isArray(content)) {
		return content.map((item) => String(item)).filter((line) => line.trim().length > 0);
	}

	if (typeof content === 'object') {
		return [JSON.stringify(content)];
	}

	return [String(content)];
};
