

const Login = () => {
    return <Appear id="bestResults" animate show={entered}>
        <Paragraph>Hall Of Fame</Paragraph>
        <Table animate show={entered}>
            <table style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th style={{ width: "3rem" }}></th>
                        <th style={{ width: "11rem" }}>Rank</th>
                        <th style={{ width: "11rem" }}>Robot ID</th>
                        <th style={{ width: "11rem" }}>Round</th>
                        <th style={{ width: "11rem" }}>Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </Table>
    </Appear>
}