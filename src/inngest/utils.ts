import { Connection, Node } from "@/generated/prisma/client";
import toposort from "toposort";
import { inngest } from "./client";
import { createId } from "@paralleldrive/cuid2";

export const topologicalSort = (
    nodes: Node[],
    connections: Connection[],
) : Node[] => {

    if(connections.length === 0) {
        return nodes;
    }

    const edges: [string, string][] = connections.map((conn) => [
        conn.fromNodeId,
        conn.toNodeId
    ])

    const connectedNodeIds = new Set<string>();
    for(const conn of connections) {
        connectedNodeIds.add(conn.fromNodeId);
        connectedNodeIds.add(conn.toNodeId)
    }

    for(const node of nodes) {
        if(!connectedNodeIds.has(node.id)) {
            edges.push([node.id, node.id])
        }
    }

    let soretdNodeIds: string[];

    try {
        soretdNodeIds = toposort(edges);
        soretdNodeIds = [...new Set(soretdNodeIds)]
    } catch (error) {
        if(error instanceof Error && error.message.includes("Cyclic")) {
            throw new Error("Workflow Contains a Cycle")
        }
        throw error
    }

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    return soretdNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean)
}

export const sendWorkflowExecution = async (data: {
    workflowId: string;
    [key: string]: any;
}) => {
    return inngest.send({
        name: "workflows/execute.workflow",
        data,
        id: createId(),
    });
};