<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output omit-xml-declaration="yes"/>

    <xsl:template match="foo">
        <transformed-foo>
            <xsl:apply-templates/>
        </transformed-foo>
    </xsl:template>

</xsl:stylesheet>
