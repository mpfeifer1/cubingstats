import React, { RefObject } from "react";
import { FileInputProps, FileInputState, MethodName, Solve } from "../Helpers/Types";
import { parseCsv } from "../Helpers/CsvParser";
import { FilterPanel } from "./FilterPanel";
import { GetDemoData } from "../Helpers/SampleData"
import { Button, Form, FormControl, Card, Row, ButtonGroup, Navbar, Container } from "react-bootstrap";
import { HelpPanel } from "./HelpPanel";
import { CalculateMostUsedMethod, CalculateWindowSize, CalculateAllSessionOptions } from "../Helpers/CubeHelpers";
import { Option } from "react-multi-select-component"
import ReactGA from 'react-ga4';

export class FileInput extends React.Component<FileInputProps, FileInputState> {
    state: FileInputState = { solves: [], showHelpModal: false };
    filterPanel: RefObject<FilterPanel> = React.createRef();

    constructor(props: FileInputProps) {
        super(props);
        ReactGA.initialize('G-BHXNCQ3K0D');
    }

    showFileData() {
        let dataset = (document.getElementById("uploaded_data") as HTMLInputElement);
        let files: FileList = dataset.files as FileList;
        let file = files.item(0);
        let text = file?.text();
        text?.then((value: string) => {
            let solveList: Solve[] = parseCsv(value, ',');
            this.setState({ solves: solveList });

            let method = CalculateMostUsedMethod(solveList);
            let newOption: Option = { label: method, value: method };
            this.filterPanel.current?.methodChanged(newOption);

            let sessions = CalculateAllSessionOptions(solveList);
            this.filterPanel.current?.chosenSessionsChanged(sessions);

            let windowSize = CalculateWindowSize(solveList.length);
            this.filterPanel.current?.windowSizeChanged(windowSize);

            this.filterPanel.current?.setTestAlert(false);

            ReactGA.event({
                category: 'DataLoaded',
                action: 'Loaded User Data',
                value: this.state.solves.length
            });
        })
    };

    showTestData() {
        let file = GetDemoData();
        let solveList: Solve[] = parseCsv(file, ',');
        this.setState({ solves: solveList });

        let method = CalculateMostUsedMethod(solveList);
        let newOption: Option = { label: method, value: method };
        this.filterPanel.current?.methodChanged(newOption);

        let sessions = CalculateAllSessionOptions(solveList);
        this.filterPanel.current?.chosenSessionsChanged(sessions);

        let windowSize = CalculateWindowSize(solveList.length);
        this.filterPanel.current?.windowSizeChanged(windowSize);

        this.filterPanel.current?.setTestAlert(true);

        ReactGA.event({
            category: 'DataLoaded',
            action: 'Loaded Test Data',
            value: this.state.solves.length
        });
    }

    helpButtonClicked() {
        this.setState({ showHelpModal: true });
    }

    closeButtonClicked() {
        this.setState({ showHelpModal: false });
    }

    render() {
        return (
            <div>
                <header className={"header"}>
                    <Navbar>
                        <Navbar.Brand>
                            Cubeast Analyzer
                        </Navbar.Brand>
                        <Button
                            onClick={() => { this.helpButtonClicked() }}>
                            Help
                        </Button>
                    </Navbar>
                </header>

                <HelpPanel showHelpPanel={this.state.showHelpModal} onCloseHandler={() => this.closeButtonClicked()} />

                <Container className="container-fluid">
                    <br />
                    <Row>
                        <Card className="info-card col-lg-6 col-md-12 col-sm-12">
                            <Form className="m-2">
                                <h3>Upload your Cubeast CSV file:</h3>
                                <FormControl type="file" id="uploaded_data" accept=".csv" />
                            </Form>
                            <ButtonGroup className="m-2">
                                <Button className="col-8" variant="success" onClick={() => { this.showFileData(); }}>
                                    Display My Stats!
                                </Button>
                                <Button className="col-4" onClick={() => { this.showTestData(); }}>
                                    Display Test Stats!
                                </Button>
                            </ButtonGroup>
                        </Card>
                    </Row>

                    <FilterPanel solves={this.state.solves} ref={this.filterPanel} />
                </Container>
            </div >
        )
    }
}