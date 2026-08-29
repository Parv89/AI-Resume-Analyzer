import pdfParse from 'pdf-parse/lib/pdf-parse.js';

/**
 * Extracts and cleans text from an uploaded PDF buffer
 * @param {Buffer} buffer - File buffer
 * @returns {Promise<{text: string, pageCount: number, wordCount: number, info: object}>}
 */
export async function extractTextFromPDF(buffer) {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error('PDF file buffer is empty');
    }

    const data = await pdfParse(buffer, {
      max: 20 // limit to 20 pages max
    });

    const rawText = data.text || '';
    const cleanedText = cleanExtractedText(rawText);

    if (!cleanedText || cleanedText.length < 30) {
      throw new Error('Could not extract readable text. The PDF might be scanned/an image without text layer or password-protected.');
    }

    const words = cleanedText.trim().split(/\s+/).filter(Boolean);

    return {
      text: cleanedText,
      pageCount: data.numpages || 1,
      wordCount: words.length,
      info: data.info || {}
    };
  } catch (error) {
    if (error.message.includes('password')) {
      throw new Error('The uploaded PDF is password protected. Please remove the password and try again.');
    }
    throw error;
  }
}

/**
 * Normalizes and cleans text from PDF extraction
 * @param {string} text 
 * @returns {string}
 */
export function cleanExtractedText(text) {
  if (!text) return '';
  return text
    // Replace multiple spaces with a single space
    .replace(/[ \t]+/g, ' ')
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim leading/trailing whitespace
    .trim();
}
